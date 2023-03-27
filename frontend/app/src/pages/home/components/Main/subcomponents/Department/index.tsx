import DeveloperDepartmentImage from '../../../../../../assets/images/developer-department.svg'
import Image from 'next/image'

export function Department({ name }: { name: string }) {
  return (
    <div className="bg-Gray-250 flex flex-col gap-y-3 p-2 pb-3 rounded-lg">
      <Image
        src={DeveloperDepartmentImage}
        width={120}
        height={104}
        alt="Imagem que representa o departamento"
      />
      <strong className="lh-22 text-xs text-center">{name}</strong>
    </div>
  )
}
