const FittrTheme = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",

        /* PREMIUM FITNESS BACKGROUND */
        background: `
          radial-gradient(circle at 20% 20%, rgba(56,189,248,0.08), transparent 40%),
          radial-gradient(circle at 80% 0%, rgba(34,197,94,0.06), transparent 40%),
          linear-gradient(180deg,#020617,#000)
        `,

        color: "#e2e8f0",

        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",

        letterSpacing: "0.3px",

        paddingBottom: "40px"
      }}
    >
      {children}
    </div>
  );
};

export default FittrTheme;


