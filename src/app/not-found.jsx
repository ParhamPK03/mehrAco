"use client";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          صفحه مورد نظر یافت نشد
        </h2>
        <p className="mt-4 text-gray-600">آدرس وارد شده معتبر نیست</p>
      </div>
    </div>
  );
}
