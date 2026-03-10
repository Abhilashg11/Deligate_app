import { FormRenderer } from "../../components/renders/formRenderer";
import { ScreenWrapper } from "../../components/wrapperComponents/screenWrapper";

export function FormScreen({ metadata, onSubmit }) {
  const form = useForm();

  return (
    <ScreenWrapper>
      <FormRenderer
        metadata={metadata}
        control={form.control}
        onSubmit={form.handleSubmit(onSubmit)}
      />
    </ScreenWrapper>
  );
}
