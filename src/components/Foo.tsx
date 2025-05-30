import { z } from "zod"
import { createHookForm } from "src/create-hook-form"
import { FormProvider } from "react-hook-form"

export const BulkEditAction = Object.freeze({
    REPLACE: "replace",
    ADD: "add",
    REMOVE: "remove",
})

export type BulkEditAction = (typeof BulkEditAction)[keyof typeof BulkEditAction]

export const BulkEditActionZodEnum = z.nativeEnum(BulkEditAction)

export const AdminPostsOverviewBulkEditSetting = Object.freeze({
    GROUPS_PERMISSIONS: "groupsPermissions",
    LOCATIONS_PERMISSIONS: "locationsPermissions",

    TAGS: "tags",
    COLLECTIONS: "collections",
})

export type AdminPostsOverviewBulkEditSetting =
    (typeof AdminPostsOverviewBulkEditSetting)[keyof typeof AdminPostsOverviewBulkEditSetting]


const AdminPostsOverviewBulkEditCollectionsZod = z.object({
    field: z.literal(AdminPostsOverviewBulkEditSetting.COLLECTIONS),
    value: z.array(z.string().uuid()),
    action: BulkEditActionZodEnum,
})

const FooForm = createHookForm({
    zodSchema: AdminPostsOverviewBulkEditCollectionsZod.omit({ field: true }),
    allowPartialDefaultValues: true,
})

export function FooPage() {
    const form = FooForm.useForm({
        defaultValues: {
            value: [],
        }
    })

    return (
        <FormProvider {...form}>
            <p>Foo</p>
        </FormProvider>
    )
}