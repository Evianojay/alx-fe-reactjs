const Login = () => {
  const handleLogin = () => {
    localStorage.setItem("authToken", "my-token");
    window.location.href = "/profile"; // Redirect after login
  };

  return <button onClick={handleLogin}>Login</button>;
};

export default Login;
