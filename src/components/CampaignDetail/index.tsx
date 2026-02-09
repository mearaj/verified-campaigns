function CampaignDetail() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Family Name</h1>
      <p className="text-sm text-gray-500">Organized by Organizer</p>

      <p className="mt-4 text-gray-800 leading-relaxed">
        Full story text goes here.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="h-40 bg-gray-200 rounded"/>
        <div className="h-40 bg-gray-200 rounded"/>
      </div>

      <button className="mt-8 w-full bg-black text-white py-3 rounded-lg">
        Donate
      </button>
    </div>
  )
}

export default CampaignDetail;
