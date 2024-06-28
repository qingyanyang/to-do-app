import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Callout } from '@radix-ui/themes';

type MyCalloutProps = {
  msg: string;
};
const MyCallout: React.FC<MyCalloutProps> = ({ msg }) => {
  return (
    <Callout.Root>
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>{msg}</Callout.Text>
    </Callout.Root>
  );
};

export default MyCallout;
