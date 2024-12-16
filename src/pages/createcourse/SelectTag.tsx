import { Dispatch, SetStateAction } from "react";
import { usePostStore } from "../../stores/postStore";
import PostingGuideTitle from "../../components/createMyCourseMain/PostingGuideTitle";
import CreateMyCourseFlowButton from "../../components/createMyCourseMain/CreateMyCourseFlowButton";

interface SelectTagProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  currentStep: number; // currentStep을 prop으로 전달받습니다.
}

export default function SelectTag({
  setCurrentStep,
  currentStep,
}: SelectTagProps) {
  const withWhomList = [
    "친구",
    "연인",
    "동료",
    "자녀",
    "지인",
    "후배",
    "고객",
    "동호회",
  ];
  const styleList = [
    "소개팅",
    "기념일",
    "생일",
    "데이트",
    "크리스마스",
    "축하 파티",
    "단체 모임",
    "회식",
    "편안함",
    "로맨틱",
    "힙한",
    "가벼운",
    "신나는",
  ];

  const withWhom = usePostStore((state) => state.withWhom);
  const setWithWhom = usePostStore((state) => state.setWithWhom);
  const deleteWithWhom = usePostStore((state) => state.deleteWithWhom);
  const style = usePostStore((state) => state.style);
  const setStyle = usePostStore((state) => state.setStyle);
  const deleteStyle = usePostStore((state) => state.deleteStyle);

  // 항목 클릭 핸들러
  const toggleSelection = (item: string, type: "style" | "withWhom") => {
    if (type === "style") {
      if (style.includes(item)) {
        // 선택 해제
        deleteStyle(item);
      } else {
        setStyle(item); // 선택 추가
      }
    } else if (type === "withWhom") {
      if (withWhom.includes(item)) {
        // 선택 해제
        deleteWithWhom(item);
      } else {
        setWithWhom(item); // 선택 추가
      }
    }
  };

  return (
    <div>
      <PostingGuideTitle titleText="어떤 코스인가요?" mt={80} />
      <fieldset className="tag--withWhom mb-[80px] mt-[123px]">
        <legend className="font-pretendard text-[21px] font-semibold text-[#7D848D] mb-[10px] block">
          누구와
        </legend>
        <ul className="list-none p-0 m-0 w-[545px] flex flex-wrap gap-[15px]">
          {withWhomList.map((item) => (
            <li
              key={item}
              className={`w-[94px] h-[45px] rounded-[30px] border-2 font-pretendard text-[16px] font-medium leading-[42px] text-center cursor-pointer ${
                withWhom.includes(item)
                  ? "bg-primary-500 text-white border-primary-500"
                  : "bg-white text-primary-600 border-primary-600"
              }`}
              onClick={() => toggleSelection(item, "withWhom")}
            >
              {item}
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className="tag--style">
        <legend className="font-pretendard text-[21px] font-semibold text-[#7D848D] mb-[10px] block">
          스타일
        </legend>
        <ul className="list-none p-0 m-0 w-[545px] flex flex-wrap gap-[15px]">
          {styleList.map((item) => (
            <li
              key={item}
              className={`w-[94px] h-[45px] rounded-[30px] border-2 font-pretendard text-[16px] font-medium leading-[42px] text-center cursor-pointer ${
                style.includes(item)
                  ? "bg-primary-500 text-white border-primary-500"
                  : "bg-white text-primary-600 border-primary-600"
              }`}
              onClick={() => toggleSelection(item, "style")}
            >
              {item}
            </li>
          ))}
        </ul>
      </fieldset>

      <div className="flex justify-center items-center mt-[140px]">
        {/* 'currentStep' 값을 넘겨서 버튼 클릭 시 step을 변경하도록 수정 */}
        <CreateMyCourseFlowButton
          isCompleteThisPage={Boolean(style.length && withWhom.length)}
          isLastStep={false}
          setCurrentStep={setCurrentStep}
          currentStep={currentStep} // 'currentStep'을 prop으로 전달
        >
          다음
        </CreateMyCourseFlowButton>
      </div>
    </div>
  );
}
