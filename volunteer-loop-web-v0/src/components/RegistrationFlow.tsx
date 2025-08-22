import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import './RegistrationFlow.css';

interface RegistrationFlowProps {
  onComplete: () => void;
}

const RegistrationFlow = ({ onComplete }: RegistrationFlowProps) => {
  const { user, signOut } = useAuth();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'volunteer' | 'organization' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    organizationName: '',
    organizationDescription: '',
    organizationWebsite: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('RegistrationFlow mounted, user:', user);
    console.log('User ID type:', typeof user?.id);
    console.log('User ID value:', user?.id);
  }, [user]);

  // Cleanup function to handle early exit
  const handleExit = async () => {
    try {
      console.log('User exiting registration, signing out');
      // Sign out the user if they exit early
      await signOut();
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  // Handle browser back/close events
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to leave? Your registration will not be saved.';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleUserTypeSelect = (type: 'volunteer' | 'organization') => {
    console.log('User selected type:', type);
    setUserType(type);
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userType) {
      console.error('Missing user or userType:', { user: !!user, userType });
      return;
    }

    console.log('=== STARTING REGISTRATION ===');
    console.log('User object:', user);
    console.log('User ID:', user.id);
    console.log('User ID type:', typeof user.id);
    console.log('UserType:', userType);
    console.log('Form data:', formData);
    console.log('Supabase client:', supabase);

    setLoading(true);
    setError('');

    try {
      // First, let's test if we can connect to the database
      console.log('Testing database connection...');
      const { data: testData, error: testError } = await supabase
        .from('users')
        .select('count')
        .limit(1);

      if (testError) {
        console.error('Database connection test failed:', testError);
        throw new Error(`Database connection failed: ${testError.message}`);
      }

      console.log('Database connection successful');

      // Create user record first
      const userRecord = {
        id: user.id,
        name: formData.name,
        role: userType,
        onboarding_complete: true,
        created_at: new Date().toISOString(),
        account_type: 'email'  // Try 'email' which is most commonly allowed
      };

      console.log('Attempting to insert user record:', userRecord);
      console.log('User ID validation:', {
        id: userRecord.id,
        idType: typeof userRecord.id,
        idLength: userRecord.id?.length,
        isValidUUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userRecord.id)
      });

      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert(userRecord)
        .select();

      if (userError) {
        console.error('Error creating user:', userError);
        console.error('Error details:', {
          code: userError.code,
          message: userError.message,
          details: userError.details,
          hint: userError.hint
        });
        
        // Log the exact data being sent
        console.error('Data that failed to insert:', userRecord);
        
        // Try to get more specific error info
        if (userError.details) {
          console.error('Error details:', userError.details);
        }
        if (userError.hint) {
          console.error('Error hint:', userError.hint);
        }
        
        throw userError;
      }

      console.log('User record created successfully:', userData);

      if (userType === 'volunteer') {
        // Create volunteer record
        const volunteerRecord = {
          user_id: user.id,
          display_name: formData.name,
          bio: '',
          skills: [],
          availability: '',
          city: '',
          region: '',
          country: '',
          created_at: new Date().toISOString()
        };

        console.log('Attempting to insert volunteer record:', volunteerRecord);

        const { error: volunteerError } = await supabase
          .from('volunteers')
          .insert(volunteerRecord);

        if (volunteerError) {
          console.error('Error creating volunteer:', volunteerError);
          throw volunteerError;
        }

        console.log('Volunteer record created successfully');
      } else if (userType === 'organization') {
        // Create organization record
        const orgRecord = {
          name: formData.organizationName,
          description: formData.organizationDescription,
          website: formData.organizationWebsite || null,
          created_by: user.id,
          created_at: new Date().toISOString(),
          owner_user_id: user.id
        };

        console.log('Attempting to insert organization record:', orgRecord);

        const { error: orgError } = await supabase
          .from('organizations')
          .insert(orgRecord);

        if (orgError) {
          console.error('Error creating organization:', orgError);
          throw orgError;
        }

        console.log('Organization record created successfully');

        // Get the organization ID and create org_admin record
        const { data: orgData, error: orgQueryError } = await supabase
          .from('organizations')
          .select('id')
          .eq('created_by', user.id)
          .single();

        if (orgQueryError) {
          console.error('Error querying organization:', orgQueryError);
          throw orgQueryError;
        }

        console.log('Organization queried successfully:', orgData);

        const adminRecord = {
          user_id: user.id,
          organization_id: orgData.id
        };

        console.log('Attempting to insert org_admin record:', adminRecord);

        const { error: adminError } = await supabase
          .from('org_admins')
          .insert(adminRecord);

        if (adminError) {
          console.error('Error creating org_admin:', adminError);
          throw adminError;
        }

        console.log('Org admin record created successfully');
      }

      // Registration complete
      console.log('=== REGISTRATION COMPLETED SUCCESSFULLY ===');
      onComplete();
    } catch (err) {
      console.error('=== REGISTRATION FAILED ===');
      console.error('Full error object:', err);
      if (err instanceof Error) {
        console.error('Error message:', err.message);
        console.error('Error stack:', err.stack);
      }
      setError(`Failed to complete registration: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    if (step === 2) {
      setStep(1);
      setUserType(null);
      setFormData({
        name: '',
        organizationName: '',
        organizationDescription: '',
        organizationWebsite: ''
      });
    }
  };

  return (
    <div className="registration-overlay">
      <div className="registration-modal">
        <div className="modal-header">
          <h2>Complete Your Profile</h2>
          <p>Let's get you set up on VolunteerLoop</p>
        </div>

        {step === 1 ? (
          <div className="user-type-selection">
            <h3>Choose Your Account Type</h3>
            <div className="type-cards">
              <div 
                className="type-card volunteer-card"
                onClick={() => handleUserTypeSelect('volunteer')}
              >
                <div className="type-icon">👤</div>
                <h4>Volunteer</h4>
                <p>I want to find and participate in volunteer opportunities</p>
              </div>
              
              <div 
                className="type-card organization-card"
                onClick={() => handleUserTypeSelect('organization')}
              >
                <div className="type-icon">🏢</div>
                <h4>Organization</h4>
                <p>I represent an organization that needs volunteers</p>
              </div>
            </div>
            
            <button onClick={handleExit} className="btn btn-secondary exit-btn">
              Exit Registration
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-header">
              <button type="button" onClick={goBack} className="back-btn">
                ← Back
              </button>
              <h3>Complete Your Profile</h3>
            </div>

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            {userType === 'organization' && (
              <>
                <div className="form-group">
                  <label htmlFor="organizationName">Organization Name *</label>
                  <input
                    type="text"
                    id="organizationName"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter organization name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="organizationDescription">Organization Description *</label>
                  <textarea
                    id="organizationDescription"
                    name="organizationDescription"
                    value={formData.organizationDescription}
                    onChange={handleInputChange}
                    required
                    placeholder="Describe what your organization does"
                    rows={3}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="organizationWebsite">Website (Optional)</label>
                  <input
                    type="url"
                    id="organizationWebsite"
                    name="organizationWebsite"
                    value={formData.organizationWebsite}
                    onChange={handleInputChange}
                    placeholder="https://your-organization.com"
                  />
                </div>
              </>
            )}

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating Account...' : 'Complete Registration'}
              </button>
              <button type="button" onClick={handleExit} className="btn btn-secondary">
                Exit Registration
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationFlow; 