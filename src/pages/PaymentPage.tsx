import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Copy } from 'lucide-react';
import { Toaster, toast } from 'sonner';
const MOCK_PIX_KEY = '00020126360014br.gov.bcb.pix0114+5511999999999520400005303986540410.005802BR5913NOME DO LOJISTA6008BRASILIA62070503***6304E2E9';
export function PaymentPage() {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const handleCopy = () => {
    navigator.clipboard.writeText(MOCK_PIX_KEY);
    setCopied(true);
    toast.success('Código PIX copiado para a área de transferência!');
    setTimeout(() => setCopied(false), 2000);
  };
  const handlePaymentConfirmation = () => {
    toast.success('Pagamento confirmado!', {
      description: 'Sua matrícula foi concluída. Bem-vindo(a) à Academia!',
    });
    setTimeout(() => {
      navigate('/');
    }, 2500);
  };
  return (
    <>
      <div className="flex flex-col min-h-screen bg-paz-background">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Card className="max-w-md mx-auto text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <CardTitle className="font-display text-2xl mt-4">Inscrição Quase Concluída!</CardTitle>
                <CardDescription>
                  Para finalizar, realize o pagamento via PIX.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border rounded-lg bg-white">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=Este-e-um-QR-Code-de-exemplo"
                    alt="QR Code PIX"
                    className="mx-auto"
                  />
                </div>
                <p className="text-sm text-paz-text-secondary">
                  Abra o aplicativo do seu banco e escaneie o QR Code acima ou use o "Copia e Cola".
                </p>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={MOCK_PIX_KEY}
                    className="w-full p-2 pr-10 border rounded bg-muted text-sm text-muted-foreground truncate"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={handleCopy}
                  >
                    {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="text-left text-sm space-y-2 p-4 bg-muted rounded-lg">
                    <p><strong>Valor:</strong> R$ 10,00 (Taxa de Matrícula)</p>
                    <p><strong>Destinatário:</strong> Escola Paz & Bem</p>
                    <p className="text-xs text-muted-foreground">
                        Este é um pagamento simulado para fins de demonstração. Nenhuma cobrança real será efetuada.
                    </p>
                </div>
                <Button className="w-full bg-paz-primary hover:bg-paz-primary/90" onClick={handlePaymentConfirmation}>
                  Já realizei o pagamento
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
      <Toaster richColors closeButton />
    </>
  );
}