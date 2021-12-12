import { useParams } from "react-router-dom";

interface RouteParams {
    scrCode: string;
}

function DetailScr() {
    const { scrCode } = useParams<RouteParams>();
    return (
        <div>디테일 {scrCode}</div>
    );
}

export default DetailScr;