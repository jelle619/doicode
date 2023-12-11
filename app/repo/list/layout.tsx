import Navigation from "../navigation"
import Content from "../content"

export default function RepoListLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navigation/>
            <Content>
                {children}
            </Content>
        </>
    )
}