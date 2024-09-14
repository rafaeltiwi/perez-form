import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';




// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  field: {
    fontSize: 12,
    marginBottom: 5,
  },
});

// Componente para generar el PDF
const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Datos del Formulario</Text>
        {Object.entries(data).map(([key, value]) => (
          <Text key={key} style={styles.field}>
            {key}: {value}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);
// Define el esquema de validación
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Email inválido.' }),
  phone: z
    .string()
    .min(10, { message: 'El teléfono debe tener al menos 10 dígitos.' }),
  address: z
    .string()
    .min(5, { message: 'La dirección debe tener al menos 5 caracteres.' }),
  city: z
    .string()
    .min(2, { message: 'La ciudad debe tener al menos 2 caracteres.' }),
  zipcode: z
    .string()
    .min(5, { message: 'El código postal debe tener al menos 5 caracteres.' }),
  // Añade más campos según sea necesario
});

export default function FormularioLargo() {
  const [activeTab, setActiveTab] = useState('datosPersonales');
  const [formData, setFormData] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipcode: '',
    },
  });

  function onSubmit(values) {
    console.log(values);
    setFormData(values);
    
    
  }
  const generatePDF = async () => {
    if (!formData) return;

    const blob = await pdf(<MyDocument data={formData} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formulario.pdf';
    link.click();
    URL.revokeObjectURL(url);
  };
  

 
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Formulario de Registro
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="datosPersonales">
                  Datos Personales
                </TabsTrigger>
                <TabsTrigger value="direccion">Dirección</TabsTrigger>
              </TabsList>
              <TabsContent value="datosPersonales" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Juan Pérez" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="juan@ejemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="direccion" className="space-y-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input placeholder="Calle Principal 123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ciudad</FormLabel>
                      <FormControl>
                        <Input placeholder="Ciudad" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código Postal</FormLabel>
                      <FormControl>
                        <Input placeholder="12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            <Button type="submit">Enviar</Button>
            {formData && (
          <Button onClick={generatePDF}>Descargar PDF</Button>
        )}
          </form>
        </Form>
      </div>
    </div>
  );
}
