const API_URL = window.location.port === '5500' || window.location.port === '5501'
    ? 'http://localhost:5000/api'
    : '/api';

// Global helper to handle expired/invalid token responses
let _isRedirecting = false;
async function handleResponse(res) {
    const data = await res.json();
    if (res.status === 401 && data.expired) {
        // Token expired or invalid - clear and redirect to login (only once)
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (!_isRedirecting) {
            _isRedirecting = true;
            alert(data.msg || 'Session expired. Please login again.');
            window.location.hash = '#login';
            window.location.reload();
        }
        throw new Error(data.msg);
    }
    if (!res.ok) throw new Error(data.msg || 'Request failed');
    return data;
}

const api = {
    // Auth Services
    auth: {
        login: async (email, password) => {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Login failed');
            return data; // Returns { msg: 'OTP sent...', email: ..., type: 'login' }
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
        }
    },

    // Resume Services
    resume: {
        get: async () => {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/resume`, {
                headers: { 'x-auth-token': token }
            });
            return handleResponse(res);
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
            return handleResponse(res);
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
            return handleResponse(res);
        },

        upload: async (file) => {
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
            return handleResponse(res);
        },

        delete: async (id) => {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/resume/${id}`, {
                method: 'DELETE',
                headers: { 'x-auth-token': token }
            });
            return handleResponse(res);
        }
    },

    // Jobs Services
    jobs: {
        getAll: async () => {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/jobs`, {
                headers: { 'x-auth-token': token }
            });
            return handleResponse(res);
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
            return handleResponse(res);
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
            return handleResponse(res);
        },

        delete: async (id) => {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/jobs/${id}`, {
                method: 'DELETE',
                headers: { 'x-auth-token': token }
            });
            return handleResponse(res);
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
