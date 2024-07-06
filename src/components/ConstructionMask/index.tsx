import { ConstructionRounded } from '@mui/icons-material';
import { Text } from '@radix-ui/themes';

function ConstructionMask() {
  return (
    <div className='bg-transparent w-full h-full backdrop-blur-[2px] absolute z-30 flex justify-center flex-col items-center'>
      <ConstructionRounded fontSize='large' />
      <Text size={'7'}>New feature will come soon</Text>
    </div>
  );
}

export default ConstructionMask;
