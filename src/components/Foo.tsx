import type { ComponentType, JSX } from "react"

export type Page<P = NonNullable<unknown>> = ComponentType<P> & {
    getLayout?: (component: JSX.Element) => JSX.Element
}

export const FooPage: Page = () => {
    return (
        <div>
            <p>Foo</p>
        </div>
    )
}

FooPage.getLayout = () => {
    return <></>
}