const handleContactClick = (navigate, location, e) => {
    e.preventDefault();
    if (location.pathname === "/about") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/about#contact");
      setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 500);
    }
  };
  
  export default handleContactClick;
  