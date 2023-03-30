import { toast } from "react-hot-toast";
import Icon from "./Icon";

interface Props {
  close: () => void;
}

const ClearDataConfirmModal = (props: Props) => {
  const { close } = props;

  const handleClearData = () => {
    window.localStorage.clear();
    close();
    toast.success("对话被清空，页面将重新刷新.");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="modal modal-middle modal-open">
      <div className="modal-box relative">
        <h3 className="font-bold text-lg">清除全部数据</h3>
        <button className="btn btn-sm btn-circle absolute right-4 top-4" onClick={close}>
          <Icon.IoMdClose className="w-5 h-auto" />
        </button>
        <div className="w-full flex flex-col justify-start items-start space-y-3 pt-4">
          <p className="text-gray-500">SQL Chat 将所有数据保存在您的浏览器缓存中. 你确定要全部清除他们吗?</p>
        </div>
        <div className="modal-action">
          <button className="btn btn-outline" onClick={close}>
            关闭
          </button>
          <button className="btn btn-error" onClick={handleClearData}>
            清空数据
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearDataConfirmModal;
