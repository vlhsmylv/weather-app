import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            &copy; 2022 Developed by <Link href={"https://valehismayilov.com"}>Valeh Ismayilov</Link>

            <style jsx>
                {`
                  footer {
                    position: absolute;
                    bottom: 20px; 
                  }
                `}
            </style>
        </footer>
    )
}