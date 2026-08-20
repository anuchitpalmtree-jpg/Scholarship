"use client";

import { Dialog } from "@base-ui/react/dialog";

export function SuccessDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-slate-950/50" />
        <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-xl">
            ✅
          </div>
          <Dialog.Title className="mt-4 text-2xl font-bold text-slate-950">
            ส่งใบสมัครสำเร็จ
          </Dialog.Title>
          <Dialog.Description className="mt-3 leading-7 text-slate-600">
            ระบบได้รับข้อมูลการขอทุนแล้ว และสร้างรายการติดตามสถานะในแดชบอร์ดของคุณ
          </Dialog.Description>
          <Dialog.Close className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#1E3A8A] px-5 py-3 font-bold text-white hover:bg-blue-950 focus:outline-none focus:ring-4 focus:ring-blue-200">
            ไปหน้าติดตามสถานะ
          </Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
