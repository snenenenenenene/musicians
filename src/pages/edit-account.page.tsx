import Button from '../components/common.components/button.component';
import Container from '../components/common.components/container.component';
import Input from '../components/common.components/input.component';
import { Title, TitleWithGoBack } from '../constants/Layout';

export default function EditAccount({ user }: any) {
  return (
    <Container className="pb-32 overflow-scroll">
      <TitleWithGoBack title="Account" />
      <div className="my-4">
        <Title title="Login" />
        <Input className="my-4" name="Password" placeholder="Password" />
        <Input className="my-4" name="Confirm password" placeholder="Confirm password" />
        <Button name="set-password" className="my-4">
          Set password
        </Button>
      </div>
    </Container>
  );
}
