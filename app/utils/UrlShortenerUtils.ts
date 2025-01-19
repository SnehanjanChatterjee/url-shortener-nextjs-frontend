export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
};

export const showToast = (message: string, type: 'success' | 'error') => {
    const toast = document.getElementById('toast') as HTMLDivElement;
    if (toast) {
      toast.className = `alert ${type === 'success' ? 'alert-success' : 'alert-error'}`;
      toast.textContent = message;
    //   toast.style.display = 'flex';
      toast.style.visibility = 'visible'; // This would preoccupy space and not change the input field's positioning when this is appearing / disappearing
      setTimeout(() => {
        // toast.style.display = 'none';
        toast.style.visibility = 'hidden';
      }, 3000);
    }
};