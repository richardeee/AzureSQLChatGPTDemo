import { useLocalStorage } from "react-use";
import Icon from "./Icon";

interface Props {
  className?: string;
  alwaysShow?: boolean;
}

const DataStorageBanner = (props: Props) => {
  const { className, alwaysShow } = props;
  const [hideBanner, setHideBanner] = useLocalStorage("hide-local-storage-banner", false);
  const show = alwaysShow || !hideBanner;

  return (
    <div
      className={`${!show && "!hidden"} ${
        className || ""
      } relative w-full flex flex-row justify-start sm:justify-center items-center px-4 py-1 bg-gray-100`}
    >
      <span className="text-sm leading-6 pr-4">
        <Icon.IoInformationCircleOutline className="inline-block h-5 w-auto -mt-0.5 mr-0.5 opacity-80" />
        连接信息当前保存在浏览器缓存中，关闭浏览器后将会丢失。您可以在设置中导出连接信息。
      </span>
      {!alwaysShow && (
        <button className="absolute right-2 sm:right-4 opacity-60 hover:opacity-100" onClick={() => setHideBanner(true)}>
          <Icon.BiX className="w-6 h-auto" />
        </button>
      )}
    </div>
  );
};

export default DataStorageBanner;
