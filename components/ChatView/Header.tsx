import { useEffect } from "react";
import { useChatStore } from "@/store";
import Icon from "../Icon";
import GitHubStarBadge from "../GitHubStarBadge";

interface Props {
  className?: string;
}

const Header = (props: Props) => {
  const { className } = props;
  const chatStore = useChatStore();
  const currentChat = chatStore.currentChat;
  const title = currentChat?.title || "SQL Chat";

  useEffect(() => {
    document.title = `${title}`;
  }, [title]);

  return (
    <div
      className={`${
        className || ""
      } w-full flex flex-row justify-between items-center lg:grid lg:grid-cols-3 py-1 border-b z-1 transition-all duration-300`}
    >
      <div className="ml-2 flex justify-start items-center">
        <label htmlFor="connection-drawer" className="w-8 h-8 p-1 mr-1 block lg:hidden rounded-md cursor-pointer hover:bg-gray-100">
          <Icon.IoIosMenu className="text-gray-600 w-full h-auto" />
        </label>
        <span className="w-auto text-left block lg:hidden">{title}</span>
        <GitHubStarBadge className="hidden lg:flex ml-2" />
      </div>
      <span className="w-auto text-center h-8 p-1 hidden lg:block">{title}</span>
    </div>
  );
};

export default Header;
