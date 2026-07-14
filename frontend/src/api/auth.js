const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

async function request(path, options) {
    const res = await fetch(`${API_URL}${path}`, options);
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.detail || "Request failed");
    return data;
}

export async function loginUser(email, password) {
    return request("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
}

export async function registerUser(name, email, password) {
    return request("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
        }),
    });
}
