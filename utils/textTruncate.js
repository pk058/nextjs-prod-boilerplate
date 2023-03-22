import ToolTip from '@components/Custom/ToolTip';

export const textTruncate = (str, num) => {
    if (str && str.length > num) {
        let subStr = str.substring(0, num);
        return (
            <ToolTip title={str}>
                <div className="cursor-pointer inline-block">{subStr + '...'}</div>
            </ToolTip>
        );
    } else {
        return str;
    }
};
