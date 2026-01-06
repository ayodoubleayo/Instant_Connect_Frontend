"use client";

export default function Bank() {
  async function save(e:any) {
    e.preventDefault();
    const f = e.target;

    await fetch("/api/admin/bank", {
      method: "POST",
      body: JSON.stringify({
        bankName: f.bank.value,
        accountName: f.name.value,
        accountNo: f.no.value,
      }),
    });

    alert("Saved");
  }

  return (
    <form onSubmit={save}>
      <input name="bank" placeholder="Bank Name" />
      <input name="name" placeholder="Account Name" />
      <input name="no" placeholder="Account No" />
      <button>Save</button>
    </form>
  );
}
