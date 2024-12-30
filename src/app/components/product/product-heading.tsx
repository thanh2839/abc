import { product } from '../../app/data';
import { AProduct } from './Aproduct';
export function ProductHeading() {
  return (
    <div className="flex justify-between">
      <h1 className="text-xl font-medium text-gray-900">{AProduct[0].name}</h1>
      <p className="text-xl font-medium text-gray-900">{AProduct[0].rate}</p>
    </div>
  );
}
