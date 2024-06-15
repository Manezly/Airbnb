export const isUserSignedIn = (): boolean => {
  const authToken = localStorage.getItem('authToken');
  return !!authToken;
};

// Sign out
export const handleSignOut = () => {
  localStorage.removeItem('authToken');

  window.location.href = '/';
};
