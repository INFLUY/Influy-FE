import Lottie from 'lottie-react';
import Onboarding1 from '@/assets/lottie/onboarding1.json';
import Onboarding3 from '@/assets/lottie/onboarding3.json';
export const LottieViewer = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      {/* <Lottie animationData={Onboarding1} loop={true}></Lottie> */}
      <Lottie animationData={Onboarding3} loop={true}></Lottie>
    </div>
  );
};
