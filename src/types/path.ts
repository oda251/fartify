export default interface Path {
  full: string;
  name: string;
}

export const strListToPathList = (strList: string[]): Path[] => {
  const pathList: Path[] = [];
  strList.forEach((str) => {
    const path: Path = {
      full: str,
      name: str.match(/([^\/]+)(?=\.[^\/]+$)|([^\/]+)$/)?.[0] || "",
    };
    pathList.push(path);
  });
  return pathList;
};
