const API_URL = window.location.port === '5500' || window.location.port === '5501'
    ? 'http://localhost:5000/api'
    : '/api';

const api = {
    // Auth Services
    auth: {
        login: async (email, password) => {
            try {
                const res = await fetch(`${API_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.msg || 'Login failed');
                return data;
            } catch (err) {
                if (err.name === 'TypeError' && err.message.includes('fetch')) {
                    throw new Error('Server unreachable. Please ensure the backend is running (run npm run server)');
                }
                throw err;
            }
        },

        register: async (email, password, displayName) => {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, displayName })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Registration failed');
            return data; // Returns { msg: 'Registration successful...', email: ..., type: 'register' }
        },

        verifyOTP: async (email, otp) => {
            const res = await fetch(`${API_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'OTP Verification failed');
            return data; // Returns { token, user }
        },

        getUser: async () => {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const res = await fetch(`${API_URL}/auth/user`, {
                headers: { 'x-auth-token': token }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Failed to fetch user');
            return data;
        },

        googleLogin: async (idToken) => {
            try {
                const res = await fetch(`${API_URL}/auth/google`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idToken })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.msg || 'Google login failed');
                return data;
            } catch (err) {
                console.error('API Google Login Error:', err);
                throw err;
            }
        },

        getConfig: async () => {
            const res = await fetch(`${API_URL}/auth/config`);
            const data = await res.json();
            if (!res.ok) throw new Error('Failed to fetch config');
            return data;
        }
    },

    // Resume Services
    resume: {
        get: async () => {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/resume`, {
                headers: { 'x-auth-token': token }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Failed to fetch resume');
            return data;
        },

        save: async (resumeData) => {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/resume`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(resumeData)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Failed to save resume');
            return data;
        },

        generate: async (formData) => {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/resume/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Generation failed');
            return data;
        },

        upload: async (file) => {
            try {
                const token = localStorage.getItem('token');
                const formData = new FormData();
                formData.append('resume', file);

                const res = await fetch(`${API_URL}/resume/upload`, {
                    method: 'POST',
                    headers: {
                        'x-auth-token': token
                    },
                    body: formData
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.msg || 'Upload and conversion failed');
                return data;
            } catch (err) {
                if (err.name === 'TypeError' && err.message.includes('fetch')) {
                    throw new Error('Server unreachable. Please check if the backend is running (run npm run server)');
                }
                throw err;
            }
        },

        delete: async (id) => {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/resume/${id}`, {
                method: 'DELETE',
                headers: { 'x-auth-token': token }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Failed to delete resume');
            return data;
        },

        getSelfIntro: async (resumeData) => {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/resume/self-intro`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ resumeData })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Self Intro generation failed');
            return data;
        },

        getLinkedInOptimization: async (resumeData) => {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/resume/linkedin-optimization`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ resumeData })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'LinkedIn optimization failed');
            return data;
        },

        getColdEmailTemplates: async (resumeData) => {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/resume/cold-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ resumeData })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Cold Email generation failed');
            return data;
        }
    },

    // Jobs Services
    jobs: {
        getAll: async () => {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/jobs`, {
                headers: { 'x-auth-token': token }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Failed to fetch jobs');
            return data;
        },

        create: async (jobData) => {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/jobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(jobData)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Failed to add job');
            return data;
        },

        update: async (id, jobData) => {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/jobs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(jobData)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Failed to update job');
            return data;
        },

        delete: async (id) => {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/jobs/${id}`, {
                method: 'DELETE',
                headers: { 'x-auth-token': token }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Failed to delete job');
            return data;
        }
    },

    // Chat Services
    chat: {
        send: async (message, context = 'general') => {
            // Check if token exists (optional depending on if chat is protected)
            const token = localStorage.getItem('token');
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['x-auth-token'] = token;

            const res = await fetch(`${API_URL}/chat`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ message, context })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Chat request failed');
            return data;
        }
    }
};

export default api;
