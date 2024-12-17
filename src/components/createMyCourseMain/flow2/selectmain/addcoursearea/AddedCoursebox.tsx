import { useState } from "react";
import images from "../../../../../assets/images/importImages";

interface AddedCourseboxProps {
  brand: string;
  index: number;
  address: string;
  category: string;
  onDelete: (id: number) => void; // 삭제 콜백 함수
}

export default function AddedCoursebox({
  brand,
  index,
  address,
  category,
  onDelete,
}: AddedCourseboxProps) {
  const [isHovered, setIsHovered] = useState(false);

  // 코스 제목 결정 로직
  const title =
    index === 1
      ? "첫번째 코스"
      : index === 2
      ? "두번째 코스"
      : index === 3
      ? "세번째 코스"
      : index === 4
      ? "네번째 코스"
      : index === 5
      ? "다섯번째 코스"
      : "기타 코스"; // 기본값 처리

  return (
    <div
      id="box-unit"
      className="font-pretendard bg-transparent w-[529px] h-[150px] pb-[9px]"
    >
      <p className="text-[18px] text-primary-600 font-semiBold leading-[28px] mb-[5px]">
        {title}
      </p>
      <div
        className={`w-[529px] h-[108px] flex justify-items-center rounded-[21px] border-dashed border-primary-500 text-white ${
          isHovered ? "bg-primary-300" : "bg-primary-500"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 삭제 아이콘 */}
        <div className="flex items-center justify-center w-[114px]">
          <img
            src={
              isHovered
                ? images.course_delete_icon
                : images.course_selected_icon
            }
            alt="아이콘"
            onClick={() => onDelete(index)} // 삭제 콜백 호출
            className="cursor-pointer" // 클릭 가능 스타일
          />
        </div>

        {/* 주소와 제목 */}
        <div className="flex justify-start items-center w-[302px]">
          <div>
            <h2 className="font-semiBold">{brand}</h2>
            <p className="font-regular">{address}</p>
          </div>
        </div>

        {/* 카테고리 */}
        <div className="flex items-center justify-center w-[113px] font-regular">
          <p>{category}</p>
        </div>
      </div>
    </div>
  );
}
