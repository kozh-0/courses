import GitHub from "./github.svg";

export const Footer = () => (
  <footer>
    <div className="footer_inner">
      <div>
        <a href="https://github.com/kozh-0/courses" target="_blank" rel="noreferrer">
          <span>GitHub</span>
          <GitHub />
        </a>
      </div>
      {/* <p>OwlTop © 2020 - 2021</p> */}
      <p>kozh inc. 2022</p>
    </div>
  </footer>
);
