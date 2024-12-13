declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: { theme: string; size: string }
          ) => void;
        };
      };
    };
    handleSignInWithGoogle: (response: CredentialResponse) => Promise<void>;
  }

  interface CredentialResponse {
    credential: string;
  }
}

export {} 