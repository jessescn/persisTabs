const downloadFile = (content: string) => {
    const blob = new Blob([content], { type: "data:text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const pom = document.createElement("a");
    pom.href = url;
    pom.setAttribute("download", "tabs.csv");
    pom.click();
};

const readFileAsync = (file: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result as string);
        };

        reader.onerror = reject;

        reader.readAsBinaryString(file);
    });
};

export { downloadFile, readFileAsync }

