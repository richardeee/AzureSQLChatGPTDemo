import Icon from "./Icon";

interface Props {
  className?: string;
}

const GitHubStarBadge = (props: Props) => {
  const { className } = props;

  return (
    <a
      className={`${
        className || ""
      } border rounded flex flex-row justify-start items-center text-black text-xs bg-white shadow-inner overflow-clip hover:opacity-80`}
      href="https://github.com/richardeee/AzureSQLChatDemo"
      target="_blank"
      aria-label="Azure SQL Chat Demo"
    >
      <span className="pr-1 pl-1.5 py-0.5 h-full flex flex-row justify-center items-center bg-gray-100 border-r font-medium">
        <Icon.IoLogoGithub className="w-4 h-auto mr-0.5" />
        <span className="mt-px">Github</span>
      </span>
    </a>
  );
};

export default GitHubStarBadge;
