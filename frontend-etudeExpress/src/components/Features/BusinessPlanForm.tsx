import React from "react";
import { motion } from "framer-motion";
import Input from "../UI/Input";
import Textarea from "../UI/Textarea";
import Select from "../UI/Select";
import Button from "../UI/Button";
import { Plus, Trash2 } from "lucide-react";

// Interface pour les champs dynamiques
interface DynamicField {
  id: string;
  label: string;
  type: "text" | "number" | "textarea" | "select";
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
}

// Interface pour les sections de formulaire
interface FormSection {
  id: string;
  title: string;
  description: string;
  fields: DynamicField[];
}

// Props du composant
interface BusinessPlanFormProps {
  section: FormSection;
  data: any;
  onDataChange: (data: any) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const BusinessPlanForm: React.FC<BusinessPlanFormProps> = ({
  section,
  data,
  onDataChange,
  onNext,
  onPrevious,
  isFirst = false,
  isLast = false,
}) => {
  // Fonction pour gérer les changements de champs simples
  const handleFieldChange = (fieldId: string, value: any) => {
    onDataChange({
      ...data,
      [fieldId]: value,
    });
  };

  // Fonction pour gérer les champs de type array
  const handleArrayFieldChange = (
    fieldId: string,
    index: number,
    value: any
  ) => {
    const currentArray = data[fieldId] || [];
    const newArray = [...currentArray];
    newArray[index] = value;

    onDataChange({
      ...data,
      [fieldId]: newArray,
    });
  };

  // Fonction pour ajouter un élément à un array
  const handleAddArrayItem = (fieldId: string) => {
    const currentArray = data[fieldId] || [];
    onDataChange({
      ...data,
      [fieldId]: [...currentArray, ""],
    });
  };

  // Fonction pour supprimer un élément d'un array
  const handleRemoveArrayItem = (fieldId: string, index: number) => {
    const currentArray = data[fieldId] || [];
    const newArray = currentArray.filter((_: any, i: number) => i !== index);

    onDataChange({
      ...data,
      [fieldId]: newArray,
    });
  };

  // Rendu d'un champ individuel
  const renderField = (field: DynamicField) => {
    const value = data[field.id];

    switch (field.type) {
      case "text":
        return (
          <Input
            key={field.id}
            label={field.label}
            value={value || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
          />
        );

      case "number":
        return (
          <Input
            key={field.id}
            label={field.label}
            type="number"
            value={value || ""}
            onChange={(e) =>
              handleFieldChange(field.id, Number(e.target.value))
            }
            placeholder={field.placeholder}
            required={field.required}
          />
        );

      case "textarea":
        return (
          <Textarea
            key={field.id}
            label={field.label}
            value={value || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            required={field.required}
          />
        );

      case "select":
        return (
          <Select
            key={field.id}
            label={field.label}
            value={value || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
          >
            <option value="">Sélectionnez...</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );

      default:
        return null;
    }
  };

  // Rendu d'un champ de type array
  const renderArrayField = (field: DynamicField) => {
    const arrayValue = data[field.id] || [""];

    return (
      <div key={field.id} className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          {field.label}
        </label>

        {arrayValue.map((item: any, index: number) => (
          <div key={index} className="flex space-x-2">
            <div className="flex-1">
              {field.type === "textarea" ? (
                <Textarea
                  value={item}
                  onChange={(e) =>
                    handleArrayFieldChange(field.id, index, e.target.value)
                  }
                  placeholder={`${field.label} ${index + 1}`}
                  rows={2}
                />
              ) : (
                <Input
                  value={item}
                  onChange={(e) =>
                    handleArrayFieldChange(field.id, index, e.target.value)
                  }
                  placeholder={`${field.label} ${index + 1}`}
                />
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRemoveArrayItem(field.id, index)}
              className="flex-shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleAddArrayItem(field.id)}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un {field.label.toLowerCase()}
        </Button>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* En-tête de la section */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6 border border-primary-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {section.title}
        </h3>
        <p className="text-gray-600">{section.description}</p>
      </div>

      {/* Formulaire */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="space-y-6">
          {section.fields.map((field) => {
            // Si le champ est de type array (basé sur le nom du champ)
            if (field.id.includes("[]")) {
              const arrayFieldId = field.id.replace("[]", "");
              return renderArrayField({
                ...field,
                id: arrayFieldId,
              });
            }

            return renderField(field);
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6">
        <Button variant="outline" onClick={onPrevious} disabled={isFirst}>
          Précédent
        </Button>

        <div className="text-sm text-gray-500">Section {section.id}</div>

        <Button onClick={onNext} disabled={isLast}>
          {isLast ? "Terminer" : "Suivant"}
        </Button>
      </div>
    </motion.div>
  );
};

export default BusinessPlanForm;
