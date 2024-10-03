import getCorrectDateTypeFromPrisma from "@/app/actions/getCorrectDateTypeFromPrisma";
import getPersianDate from "@/app/actions/getPersianDate";
import { getPersianNumbers } from "@/app/actions/getPersianNumbers";
import getPricingFormat from "@/app/actions/getPricingFormat";
import { Card } from "@prisma/client";
import React from "react";

const DetailsComponent = ({ data }: { data: Card }) => {
  return (
    <div className="flex-col flex items-center justify-center w-full">
      <div className=" flex items-center justify-center w-full flex-col pb-[300px]">
        <p className="w-full text-right py-10  font-vazir font-extrabold text-[20px]">
          جزئیات کارت
        </p>
        <div className="grid grid-cols-2 px-5 w-full gap-10 text-right ">
          <div className="w-full">
            <p className="font-vazir text-right font-extralight">
              : بدهی ثبت شده
            </p>
            <div className="font-vazirthin text-right pt-5">
              <p className="inline-block pr-2">تومان</p>
              <p className="inline-block">
                {getPersianNumbers(getPricingFormat(data.amount.toString()))}
              </p>
            </div>
          </div>
          <div className="w-full">
            <p className="font-vazir text-right font-extralight">
              : نام و نام خانوادگی
            </p>
            <div className="font-vazirthin text-right pt-5">
              <p className="inline-block">{data.person}</p>
            </div>
          </div>
          <div className="w-full">
            <p className="font-vazir text-right font-extralight">
              : تاریخ پایان مهلت پرداخت
            </p>
            <div className="font-vazirthin text-right pt-5">
              <p className="inline-block">
              {getPersianDate(getCorrectDateTypeFromPrisma(data.createdAt),true)}

              </p>
            </div>
          </div>
          <div className="w-full">
            <p className="font-vazir text-right font-extralight">
              : تاریخ ساخت کارت
            </p>
            <div className="font-vazirthin text-right pt-5">
              <p className="inline-block">
                {getPersianDate(getCorrectDateTypeFromPrisma(data.createdAt),false)}
              </p>
            </div>
          </div>
        </div>
        <p className="w-full text-right py-10  font-vazir font-extrabold text-[20px]">
           توضیحات کارت
        </p>
        <div className=" text-right px-2">
         
          <p className="font-vazirthin">

          
        مشتری گرامی،

از اینکه به وب‌سایت ما مراجعه کرده‌اید تا بدهی خود را مشاهده و تسویه کنید، بسیار سپاسگزاریم. هدف ما این است که فرآیند بررسی و پرداخت بدهی شما را تا حد ممکن ساده و سریع کنیم. در این بخش، شما می‌توانید به راحتی تمام اطلاعات مربوط به بدهی خود را مشاهده کرده و مراحل پرداخت را به سادگی طی کنید.

اگر سوالی در مورد جزئیات بدهی، مهلت‌های پرداخت، یا گزینه‌های مختلف تسویه دارید، تیم پشتیبانی ما همیشه آماده کمک به شما است. ما متعهد هستیم که به تمامی پرسش‌ها و نیازهای شما به بهترین نحو پاسخ دهیم تا از صحت اطلاعات و رضایت شما اطمینان حاصل کنیم.

لطفاً توجه داشته باشید که پرداخت‌های به موقع نه تنها از افزایش بدهی و اعمال جریمه‌ها جلوگیری می‌کند، بلکه به شما کمک می‌کند تا اعتبار مالی خود را بهبود بخشید. همچنین، در صورتی که به هر دلیلی امکان پرداخت فوری ندارید، می‌توانید با ما تماس بگیرید تا راهکارهای جایگزین یا شرایط پرداخت منعطف را با شما بررسی کنیم.

از اینکه ما را به عنوان یک مرجع قابل اعتماد برای تسویه حساب‌های مالی خود انتخاب کرده‌اید، قدردانی می‌کنیم. ما به ارائه خدمات سریع، دقیق و امن افتخار می‌کنیم و امیدواریم تجربه شما از استفاده از وب‌سایت ما رضایت‌بخش باشد.

در صورت بروز هرگونه مشکل فنی در وب‌سایت یا نیاز به کمک فوری، تیم پشتیبانی ما در هر لحظه آماده پاسخگویی است. شما می‌توانید از طریق ایمیل، تماس تلفنی یا چت آنلاین با ما در ارتباط باشید.

با تشکر و احترام،
تیم پشتیبانی.
</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsComponent;
