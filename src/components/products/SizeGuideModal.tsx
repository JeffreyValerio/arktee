"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ruler } from "lucide-react";

export function SizeGuideModal() {
  const sizeChart = [
    { size: "XS", chest: "86-91", length: "66", shoulder: "40" },
    { size: "S", chest: "91-96", length: "68", shoulder: "42" },
    { size: "M", chest: "96-101", length: "70", shoulder: "44" },
    { size: "L", chest: "101-106", length: "72", shoulder: "46" },
    { size: "XL", chest: "106-111", length: "74", shoulder: "48" },
    { size: "XXL", chest: "111-116", length: "76", shoulder: "50" },
    { size: "XXXL", chest: "116-121", length: "78", shoulder: "52" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-primary hover:text-primary/80 transition-colors p-0 h-auto font-normal"
        >
          Guía de tallas
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Ruler className="h-5 w-5" />
            Guía de Tallas
          </DialogTitle>
          <DialogDescription>
            Mide tu camiseta favorita y compara con nuestra tabla de medidas (en centímetros)
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Instructions */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 space-y-2">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
              Cómo medir:
            </h3>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
              <li><strong>Pecho:</strong> Mide el ancho de la camiseta de lado a lado, justo debajo de las mangas</li>
              <li><strong>Largo:</strong> Mide desde el hombro hasta el dobladillo inferior</li>
              <li><strong>Hombro:</strong> Mide desde un extremo del hombro hasta el otro</li>
            </ul>
          </div>

          {/* Size Chart Table */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
                      Talla
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-gray-100">
                      Pecho (cm)
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-gray-100">
                      Largo (cm)
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-gray-100">
                      Hombro (cm)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sizeChart.map((row, index) => (
                    <tr
                      key={row.size}
                      className={`border-b border-gray-200 dark:border-gray-700 ${
                        index % 2 === 0
                          ? "bg-white dark:bg-gray-900"
                          : "bg-gray-50 dark:bg-gray-800"
                      }`}
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                        {row.size}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                        {row.chest}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                        {row.length}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                        {row.shoulder}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
            <p className="text-xs text-blue-800 dark:text-blue-200">
              <strong>💡 Consejo:</strong> Si estás entre dos tallas, te recomendamos elegir la talla más grande para un ajuste más cómodo.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

