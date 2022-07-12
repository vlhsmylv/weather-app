import Image from "next/image";

export default function Loading() {
    return (
        <div className={"loading"}>
            <Image src={"/svg/loading.svg"} layout={"fixed"} width={"128px"} height={"128px"} />
        </div>
    )
}