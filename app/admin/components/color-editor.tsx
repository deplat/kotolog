import { SubmitHandler, useForm } from 'react-hook-form'
import { ColorCreateInput } from '@/types'
import { useRouter } from 'next/navigation'

export const ColorCreationForm = ({ closeForm }: { closeForm: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ColorCreateInput>()
  const router = useRouter()
  const onSubmit: SubmitHandler<ColorCreateInput> = async (data) => {
    try {
      const response = await fetch('/api/colors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        console.error('Network response was not ok')
      }
      const createdColor = await response.json()
      console.log('Color created:', createdColor)
      router.refresh()
      closeForm()
    } catch (error) {
      console.error('Error creating color:', error)
    }
  }
  return (
    <div className="container mx-auto max-w-3xl rounded-md bg-white/75 p-4 backdrop-blur-lg">
      <h3 className="mb-2 text-2xl font-semibold">новый цвет.</h3>
      <hr className="mb-4 border" style={{ borderColor: '#F35627' }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-4 flex items-center">
          <label className="w-1/4">Имя</label>
          <input
            className="form-input w-3/4 rounded border-gray-300"
            {...register('name', { required: 'Обязательное поле!' })}
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>
        <div className="flex justify-end">
          <button className="p-2 px-4 hover:underline" type="button" onClick={closeForm}>
            Закрыть
          </button>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            type="submit"
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  )
}
