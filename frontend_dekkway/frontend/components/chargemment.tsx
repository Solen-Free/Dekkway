function LoadingSpinner() {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FC9B89]"></div>
        if (loading) return <LoadingSpinner />;
        if (!logement) return <div className="text-center text-red-500">Logement non trouvé</div>;
      </div>
    );
  }