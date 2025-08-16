import { FaGoogle, FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="flex gap-6 mt-6 text-2xl">
      <a
        href="https://gdg.community.dev/gdg-on-campus-william-mary-williamsburg-united-states/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-gray-900"
      >
        <FaGoogle />
      </a>
      <a
        href="https://github.com/gdscwm"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-gray-900"
      >
        <FaGithub />
      </a>
      <a
        href="https://www.facebook.com/developerstudentclubWM/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-gray-900"
      >
        <FaFacebook />
      </a>
      <a
        href="https://www.instagram.com/dsc_wm"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-gray-900"
      >
        <FaInstagram />
      </a>
    </div>
  );
}
