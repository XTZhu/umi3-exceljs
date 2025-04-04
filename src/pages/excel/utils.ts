import { renderToStaticMarkup } from 'react-dom/server';

/**
 * 将 JSX 内容转换为纯文本
 * @param content JSX 内容或 React 元素
 */
export const jsxToString = (content: React.ReactNode): string => {
  if (content === null || content === undefined) {
    return '';
  }

  if (
    typeof content === 'string' ||
    typeof content === 'number' ||
    typeof content === 'boolean'
  ) {
    return String(content);
  }

  try {
    // 尝试将 JSX 转为 HTML 字符串
    const htmlString = renderToStaticMarkup(content as React.ReactElement);
    const text = htmlString.replace(/<[^>]*>/g, '');
    return text;
  } catch (error) {
    console.error('转换 JSX 到字符串失败:', error);
    return String(content) || '';
  }
};
