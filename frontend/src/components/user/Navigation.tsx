interface NavigationProps {
    setUserTypeSelector: (role: string) => void,
}

export default function Navigation(props: NavigationProps) {
    return (
        <nav className="border-b-1">
            <ul className="flex list-none [&>li]:m-2 [&>li]:hover:underline [&>li]:hover:cursor-pointer justify-center">
                <li onClick={() => { props.setUserTypeSelector('detail') }}>Détail</li>
                <li onClick={() => { props.setUserTypeSelector('etudiants') }}>Étudiants</li>
                <li onClick={() => { props.setUserTypeSelector('intervenants') }}>Intervenants</li>
            </ul>
        </nav>
    )
}
