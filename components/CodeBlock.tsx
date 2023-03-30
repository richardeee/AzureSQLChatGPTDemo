import { toast } from "react-hot-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useConnectionStore, useQueryStore } from "@/store";
import { checkStatementIsSelect } from "@/utils";
import Icon from "./Icon";

interface Props {
  language: string;
  value: string;
}

export const CodeBlock = (props: Props) => {
  const { language, value } = props;
  const connectionStore = useConnectionStore();
  const queryStore = useQueryStore();
  const currentConnectionCtx = connectionStore.currentConnectionCtx;
  // Only show execute button in the following situations:
  // * SQL code, and it is a SELECT statement;
  // * Connection setup;
  const showExecuteButton =
    language.toUpperCase() === "SQL" && checkStatementIsSelect(value) && currentConnectionCtx?.connection && currentConnectionCtx?.database;

  const copyToClipboard = () => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      toast.error("复制到剪贴板失败");
      return;
    }
    navigator.clipboard.writeText(value).then(() => {
      toast.success("已复制到剪贴板");
    });
  };

  const handleExecuteQuery = () => {
    if (!currentConnectionCtx) {
      toast.error("请先选择一个数据库连接");
      return;
    }

    queryStore.setContext({
      connection: currentConnectionCtx.connection,
      database: currentConnectionCtx.database,
      statement: value,
    });
    queryStore.toggleDrawer(true);
  };

  return (
    <div className="w-full max-w-full relative font-sans text-[16px]">
      <div className="flex items-center justify-between py-2 px-4">
        <span className="text-xs text-white font-mono">{language}</span>
        <div className="flex items-center space-x-2">
          <button
            className="flex justify-center items-center rounded bg-none w-6 h-6 p-1 text-xs text-white bg-gray-500 opacity-70 hover:opacity-100"
            onClick={copyToClipboard}
          >
            <Icon.BiClipboard className="w-full h-auto" />
          </button>
          {showExecuteButton && (
            <button
              className="flex justify-center items-center rounded bg-none w-6 h-6 p-1 text-xs text-white bg-gray-500 opacity-70 hover:opacity-100"
              onClick={handleExecuteQuery}
            >
              <Icon.IoPlay className="w-full h-auto" />
            </button>
          )}
        </div>
      </div>
      <SyntaxHighlighter language={language.toLowerCase()} style={oneDark} customStyle={{ margin: 0 }}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
};
