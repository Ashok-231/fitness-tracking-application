const FittrTheme = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #020617, #000)",
        color: "#e5f2ff",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}
    >
      {children}
    </div>
  );
};

export default FittrTheme;


