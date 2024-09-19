export const getWalletByUserId = async (id: number) => {
  const res = await fetch(`http://localhost:8000/api/wallets/${id}`)
  const result = await res.json()

  return { result: result.wallet.data, ok: res.ok }
}