import React, { ReactNode } from "react";
import { PortalWithState, PortalWithStateProps } from 'react-portal';
import classnames from 'classnames';
import { Button } from "../button";
import { ReactComponent as CloseIcon } from "./icons/close.svg";

import styles from './modal.module.scss';

interface ModalProps extends Omit<PortalWithStateProps, "children"> {
  isOpen: boolean;
  className?: string;
  onOpen?: () => void;
  onClose?: () => void;
  showCloseButton?: boolean;
  showActionButtons?: boolean;
  showSubmitButton?: boolean;
  submitButtonCaption?: string;
  showDiscardButton?: boolean;
  discardButtonCaption?: string;
  closeOnOutsideClick?: boolean;
  children?: ReactNode;
  actionButtons?: ReactNode;
  onSubmit?: () => void;
  onDiscard?: () => void;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const {
    isOpen,
    className,
    showCloseButton = true,
    showActionButtons = true,
    closeOnOutsideClick = true,
    showSubmitButton = true,
    showDiscardButton = true,
    submitButtonCaption = "OK",
    discardButtonCaption = "Cancel",
    actionButtons = null,
    onSubmit = () => {},
    onDiscard = () => {},
    children,
    ...rest
  } = props;

  if (!isOpen) {
    return null;
  }

  const cn = classnames(styles.modal, className);

  return (
    <PortalWithState
      closeOnEsc
      defaultOpen
      closeOnOutsideClick={closeOnOutsideClick}
      {...rest}
    >
      {
        ({ closePortal, portal }) => {
          const handleDiscard = () => {
            closePortal();
            onDiscard();
          }

          const handleSubmit = () => {
            closePortal();
            onSubmit();
          }

          return portal(
            <div className={styles.overlay}>
              <div className={cn}>
                {
                  showCloseButton && (
                    <a className={styles.closeButton} onClick={closePortal}>
                      <CloseIcon width={14} height={14} />
                    </a>
                  )
                }

                <div className={styles.content}>
                  { children }
                </div>

                {
                  showActionButtons && (
                    <div className={styles.actions}>
                      {actionButtons || (
                        <>
                          {
                            showDiscardButton && (
                              <Button onClick={handleDiscard}>
                                {discardButtonCaption}
                              </Button>
                            )
                          }
                          {
                            showSubmitButton && (
                              <Button
                                onClick={handleSubmit}
                                variant="primary"
                              >
                                {submitButtonCaption}
                              </Button>
                            )
                          }
                        </>
                      )}
                    </div>
                  )
                }
              </div>
            </div>
          )
        }
      }
    </PortalWithState>
  )
}
