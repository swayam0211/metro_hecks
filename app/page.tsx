export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6 text-center">
      <div className="rounded-[32px] bg-white p-8 shadow-xl max-w-md w-full border border-gray-100">
        <div className="w-16 h-16 rounded-full bg-[#7D9BB3] text-white flex items-center justify-center font-bold text-2xl mx-auto mb-4">
          MF
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">MetroFlow Prototype</h1>
        <p className="text-gray-500 text-sm">Offline Super App for Metro Hacks</p>
      </div>
    </main>
  );
}
