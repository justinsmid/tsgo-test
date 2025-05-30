import { zodResolver } from "@hookform/resolvers/zod"
import type { ReactElement } from "react"
import type {
  Control,
  ControllerProps,
  DeepPartial,
  FieldArrayPath,
  FieldPath,
  FieldValues,
  UseControllerProps,
  UseControllerReturn,
  UseFieldArrayProps,
  UseFieldArrayReturn,
  UseFormProps,
} from "react-hook-form"
import {
  Controller,
  type FieldPathValue,
  useController,
  useFieldArray,
  useForm,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form"
import type { z } from "zod"

type FinalUseFormProps<
  TFieldValues extends FieldValues,
  TAllowPartialDefaultValues extends boolean = false,
> = Omit<UseFormProps<TFieldValues>, "defaultValues"> & {
  defaultValues?: TAllowPartialDefaultValues extends true ? DeepPartial<TFieldValues> : TFieldValues
}

type UseFormType<
  TFieldValues extends FieldValues,
  TFieldValuesOutput extends TFieldValues,
  TAllowPartialDefaultValues extends boolean = false,
> = (
  props?: FinalUseFormProps<TFieldValues, TAllowPartialDefaultValues>,
) => ReturnType<typeof useForm<TFieldValues, any, TFieldValuesOutput>>

// TODO: useWatch has multiple overload signatures. We would ideally use `typeof useWatch` directly,
//       but the types for these different overloads don't (currently) result in the expected
//       discriminated union type.
//       Since we only use one of the overload variations as of right now, we can use that one's
//       props and return type for now.
//       Try to find a way to use the actual useWatch type in the future.
type UseWatchProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = {
  name: TName
  defaultValue?: FieldPathValue<TFieldValues, TName>
  control?: Control<TFieldValues>
  disabled?: boolean
  exact?: boolean
}

type UseWatchReturn<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = FieldPathValue<TFieldValues, TName>

export type HookForm<
  TFieldValues extends FieldValues,
  TFieldValuesOutput extends TFieldValues = TFieldValues,
  TAllowPartialDefaultValues extends boolean = false,
> = {
  useForm: UseFormType<TFieldValues, TFieldValuesOutput, TAllowPartialDefaultValues>

  useFieldArray: <TName extends FieldArrayPath<TFieldValues>>(
    props: UseFieldArrayProps<TFieldValues, TName>,
  ) => UseFieldArrayReturn<TFieldValues, TName>

  useFormContext: typeof useFormContext<TFieldValues>

  useController: <TName extends FieldPath<TFieldValues>>(
    props: UseControllerProps<TFieldValues, TName>,
  ) => UseControllerReturn<TFieldValues, TName>

  Controller: <TName extends FieldPath<TFieldValues>>(
    props: ControllerProps<TFieldValues, TName>,
  ) => ReactElement

  useFormState: typeof useFormState<TFieldValues>

  useWatch: <TName extends FieldPath<TFieldValues>>(
    props: UseWatchProps<TFieldValues, TName>,
  ) => UseWatchReturn<TFieldValues, TName>
}

interface CreateHookFormOptions<
  TFieldValues extends FieldValues,
  TFieldValuesOutput extends FieldValues,
  TAllowPartialDefaultValues extends boolean = false,
> {
  zodSchema: z.ZodSchema<TFieldValuesOutput, z.ZodTypeDef, TFieldValues>
  allowPartialDefaultValues?: TAllowPartialDefaultValues
}

export function createHookForm<
  TFieldValues extends FieldValues,
  TFieldValuesOutput extends TFieldValues,
  TAllowPartialDefaultValues extends boolean = false,
>(
  options: CreateHookFormOptions<TFieldValues, TFieldValuesOutput, TAllowPartialDefaultValues>,
): HookForm<TFieldValues, NoInfer<TFieldValuesOutput>, TAllowPartialDefaultValues> {
  return {
    useForm: (props) => {
      const finalProps: FinalUseFormProps<TFieldValues, TAllowPartialDefaultValues> = {
        resolver: zodResolver(options.zodSchema),
        mode: "onBlur",
        ...props,
      }

      const result = useForm(finalProps as UseFormProps<TFieldValues>)

      return {
        ...result,
        setValue: (
          name,
          value,
          { shouldDirty = true, shouldValidate = true, shouldTouch = true, ...options } = {},
        ) => result.setValue(name, value, { shouldDirty, shouldValidate, shouldTouch, ...options }),
      }
    },
    useFieldArray,
    useFormContext: (...args) => {
      const result = useFormContext<TFieldValues>(...args)

      return {
        ...result,
        setValue: (
          name,
          value,
          { shouldDirty = true, shouldValidate = true, shouldTouch = true, ...options } = {},
        ) => result.setValue(name, value, { shouldDirty, shouldValidate, shouldTouch, ...options }),
      }
    },
    useController,
    Controller,
    useFormState,
    useWatch,
  }
}
